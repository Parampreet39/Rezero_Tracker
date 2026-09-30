# Zero-dependency PowerShell static web server for Windows
# Runs on Windows 7, 8, 10, 11 using built-in .NET HttpListener

$port = 3000
$root = Join-Path $PSScriptRoot "dist"
if (-not (Test-Path (Join-Path $root "index.html"))) {
    $root = $PSScriptRoot
}

$url = "http://localhost:$port/"
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Re:Zero - Rem Chronicle (Windows Local Server)" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host " Serving files from: $root" -ForegroundColor Yellow
Write-Host " Local URL:         $url" -ForegroundColor Green
Write-Host " Press Ctrl+C in this window to stop the server." -ForegroundColor Gray
Write-Host "========================================================" -ForegroundColor Cyan

# Start HTTP Listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
} catch {
    Write-Host "[ERROR] Could not start server on port $port: $_" -ForegroundColor Red
    Write-Host "Trying port 3001..." -ForegroundColor Yellow
    $port = 3001
    $url = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($url)
    $listener.Start()
}

# Open browser
try {
    Start-Process $url
} catch {
    # Ignore browser open error
}

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff2"= "font/woff2"
    ".woff" = "font/woff"
    ".ttf"  = "font/ttf"
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrEmpty($localPath)) {
            $localPath = "index.html"
        }
        
        $targetFile = Join-Path $root $localPath
        
        # SPA Fallback: if file doesn't exist, serve index.html
        if (-not (Test-Path $targetFile -PathType Leaf)) {
            $targetFile = Join-Path $root "index.html"
        }
        
        if (Test-Path $targetFile -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($targetFile).ToLower()
            $contentType = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $contentType = $mimeTypes[$ext]
            }
            
            $fileBytes = [System.IO.File]::ReadAllBytes($targetFile)
            $response.ContentType = $contentType
            $response.ContentLength64 = $fileBytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
            $response.OutputStream.Write($msg, 0, $msg.Length)
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
