$root = "C:\Users\danie\AndroidStudioProjects\SAI NA"
$func = Join-Path $root "functions"

# Copy server code into functions/
Copy-Item (Join-Path $root "server\*.js") -Destination $func
Copy-Item (Join-Path $root "server\config") -Destination $func -Recurse
Copy-Item (Join-Path $root "server\routes") -Destination $func -Recurse
Copy-Item (Join-Path $root "server\models") -Destination $func -Recurse
Copy-Item (Join-Path $root "server\middleware") -Destination $func -Recurse
Copy-Item (Join-Path $root "server\utils") -Destination $func -Recurse
Copy-Item (Join-Path $root "server\.env") -Destination $func -ErrorAction SilentlyContinue

Write-Host "Files copied. Deploying..."
& "$env:USERPROFILE\AppData\Roaming\npm\firebase.cmd" deploy --only functions
