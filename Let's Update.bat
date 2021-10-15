@ECHO OFF
set /p commit="What is your update?"
cd C:\Users\kaung\Desktop\Original\Excel Heat Mapping
git add .
git status
git commit -m "%commit%"
git push origin master
Set WshShell = WScript.CreateObject("WScript.Shell")
WshShell.SendKeys "{ENTER}"
PAUSE