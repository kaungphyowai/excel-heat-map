@ECHO OFF
set /p commit="What is your update?"
cd "C:\Users\kaung\Desktop\Excel_Heat_Mapping_MIMU_V206_20200513\Excel Heat Mapping"
git add .
git status
git commit -m "%commit%"
git push origin master
PAUSE