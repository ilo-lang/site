#!/usr/bin/env pwsh
# Install ilo for Windows
$ErrorActionPreference = 'Stop'

$Repo = "ilo-lang/ilo"
$Target = "x86_64-pc-windows-msvc"
$Url = "https://github.com/$Repo/releases/latest/download/ilo-$Target.exe"

$InstallDir = "$env:USERPROFILE\.ilo\bin"
New-Item -ItemType Directory -Force -Path $InstallDir | Out-Null

Write-Host "Downloading ilo for $Target..."
Invoke-WebRequest -Uri $Url -OutFile "$InstallDir\ilo.exe" -UseBasicParsing

$Version = & "$InstallDir\ilo.exe" --version 2>$null
if ($Version) { Write-Host "Installed $Version to $InstallDir\ilo.exe" }
else { Write-Host "Installed ilo to $InstallDir\ilo.exe" }

# Add to PATH for current user if not already there
$UserPath = [Environment]::GetEnvironmentVariable('Path', 'User')
if ($UserPath -notlike "*$InstallDir*") {
    [Environment]::SetEnvironmentVariable('Path', "$UserPath;$InstallDir", 'User')
    $env:Path = "$env:Path;$InstallDir"
    Write-Host "Added $InstallDir to your PATH"
}

Write-Host "Run 'ilo --version' to verify (restart your terminal if needed)"
