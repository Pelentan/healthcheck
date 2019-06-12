#!/bin/bash

# Setting total cycles of the script pachage to run.  Presets interval between runs to the minimum limit of 
# 3 seconds
if [ $1 ] && [ $1 -gt 0 ]
then
  _droneCycles=$1
  _droneInterval=3
else
  _droneCycles=1
  _droneInterval=3
fi 

# If valid interval (over 3 seconds) is given, sets interval to that.
if [ $2 ] && [ $2 -gt 3 ]
then
  _droneInterval=$2
fi 

# The name of the file that\"s going to be created for the health-check app to download.
if [ $3 ] 
then 
  _logFile=$3
else
  _logFile="hc-server-report.hc"
fi

_scanZeit=$(date +%s)

# Creating the file that will be downloaded.  Then initiates the scan cycles.
_cnt=1
touch ${_logFile}
chmod 600 ${_logFile}

echo "{\"host\": \"$HOSTNAME\", \"startDT\": $_scanZeit," > ${_logFile}
echo "\"cycleCount\": $_droneCycles, \"cycleInterval\": $_droneInterval, \"cycles\": {" >> ${_logFile}
while [ $_cnt -le $_droneCycles ]
do
  _cycleZeit=$(date +%s)
  echo "\"${_cnt}\": {\"cycleCount\": $_cnt, \"cycleTime\": $_cycleZeit," >> ${_logFile}
  ((_cnt++))

  #  Gathering data.  This is the section where any commands or scripts can be added and the output
  # assigned to a variable.  This is kept separate from the file-write section for readability.
  _uptime=$(uptime)
  _free=$(free)
  _vmstat=$(vmstat)
  _iostat=$(iostat)
  _ps=$(ps -ef)
  _netstat=$(netstat)
  _df=$(df)

  # Create log file.  This is where the data is added to the file.
  echo "\"uptime\": \"$_uptime\", " >> ${_logFile}
  echo "\"free\": \"$_free\"," >> ${_logFile}
  echo "\"df\": \"$_df\", " >> ${_logFile}
  echo "\"vmstat\": \"$_vmstat\", " >> ${_logFile}
  echo "\"iostat\": \"$_iostat\", " >> ${_logFile}
  echo "\"ps\": \"$_ps\", " >> ${_logFile}
  echo "\"netstat\": \"$_netstat\", " >> ${_logFile}
  echo "}, " >> ${_logFile}
  # Cycles the gatherign of data.
  if [ $_cnt -le $_droneCycles ]
  then
    sleep $_droneInterval
  fi
done

echo "}" >> ${_logFile}
# sed -i ':a;N;$!ba;s/\n/ /g' ${_logFile}

# I decided to make the file readable only to further keep it safe. Just in case there is someway to introduce 
# a test "script" that add executable data to the log file.  Might be overkill, but it was one command.
chmod 444 ${_logFile}
