# ─────────────────────────────────────────────────────────────
# obsidian-sync.ps1
# Copies and converts Obsidian notes → Hugo content/notes
#
# Usage (from your blog root):
#   .\scripts\obsidian-sync.ps1 -VaultPath "C:\Users\YOU\Documents\MyVault"
# ─────────────────────────────────────────────────────────────

param(
    [string]$VaultPath = "$HOME\Documents\ObsidianVault"
)

$HugoNotesDir  = ".\content\notes"
$HugoAssetsDir = ".\assets\obsidian"

Write-Host "📂 Vault source : $VaultPath"
Write-Host "📁 Hugo notes   : $HugoNotesDir"

# Create output folders if they don't exist
New-Item -ItemType Directory -Force -Path $HugoNotesDir  | Out-Null
New-Item -ItemType Directory -Force -Path $HugoAssetsDir | Out-Null

# Get all markdown files from the vault root (not subfolders)
$mdFiles = Get-ChildItem -Path $VaultPath -Filter "*.md" -File

foreach ($file in $mdFiles) {

    # Build a URL-friendly folder name from the filename
    $slug = $file.BaseName `
        -replace '\s+', '-' `
        -replace '[^a-zA-Z0-9\-]', '' `
        | ForEach-Object { $_.ToLower() }

    $destDir = Join-Path $HugoNotesDir $slug
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null

    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # ── 1. Convert [[WikiLink]] → Hugo relref shortcode ──────
    $content = $content -replace '\[\[([^\]\|]+)\]\]', {
        $linkTarget = $_.Groups[1].Value
        $linkSlug   = $linkTarget -replace '\s+','-' -replace '[^a-zA-Z0-9\-]','' | ForEach-Object { $_.ToLower() }
        "[$linkTarget]({{< relref `"$linkSlug`" >}})"
    }

    # ── 2. Convert [[WikiLink|Alias]] → [Alias](relref) ──────
    $content = $content -replace '\[\[([^\]\|]+)\|([^\]]+)\]\]', {
        $linkTarget = $_.Groups[1].Value
        $alias      = $_.Groups[2].Value
        $linkSlug   = $linkTarget -replace '\s+','-' -replace '[^a-zA-Z0-9\-]','' | ForEach-Object { $_.ToLower() }
        "[$alias]({{< relref `"$linkSlug`" >}})"
    }

    # ── 3. Convert ![[image.png]] → Hugo figure shortcode ────
    $content = $content -replace '!\[\[([^\]]+\.(png|jpg|jpeg|gif|webp))\]\]', {
        $imgName = $_.Groups[1].Value
        "{{< figure src=`"/obsidian/$imgName`" >}}"
    }

    # ── 4. Add front matter if the note doesn't have one ─────
    if ($content -notmatch '^---') {
        $title     = $file.BaseName  # use original filename as title
        $today     = Get-Date -Format "yyyy-MM-dd"
        $frontmatter = @"
---
title: "$title"
date: $today
draft: false
tags: ["obsidian"]
---

"@
        $content = $frontmatter + $content
    }

    # Write converted file
    $destFile = Join-Path $destDir "index.md"
    Set-Content -Path $destFile -Value $content -Encoding UTF8

    Write-Host "  ✅ $($file.Name)  →  notes\$slug\index.md"
}

# ── 5. Copy image attachments from Obsidian ──────────────────
$attachmentsDir = Join-Path $VaultPath "attachments"
if (Test-Path $attachmentsDir) {
    Write-Host "📸 Copying attachments..."
    Copy-Item -Path "$attachmentsDir\*" -Destination $HugoAssetsDir -Recurse -Force
}

Write-Host ""
Write-Host "✨ Sync done! Run 'hugo server -D' to preview."