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
  # This can be touchyed
  _logFile="hc-server-report.hc" 
fi

_fileName=$_logFile
_scanZeit=$(date +%s)

# Creating the file that will be downloaded.  Then initiates the scan cycles.
_cnt=1
touch ${_logFile}
chmod 600 ${_logFile}

_data="{\"host\": \"$HOSTNAME\", \"startDT\": $_scanZeit," 
_data+="\"cycleCount\": $_droneCycles, \"cycleInterval\": $_droneInterval, \"cycles\": {"
while [ $_cnt -le $_droneCycles ]
do
  _cycleZeit=$(date +%s)
  _data+="\"${_cnt}\": {\"cycleCount\": $_cnt, \"cycleTime\": $_cycleZeit," 
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

  #Create log data.  
  _data+="\"uptime\": \"$_uptime\", "
  _data+="\"free\": \"$_free\","
  _data+="\"df\": \"$_df\", "
  _data+="\"vmstat\": \"$_vmstat\", "
  _data+="\"iostat\": \"$_iostat\", "
  _data+="\"ps\": \"$_ps\", "
  _data+="\"netstat\": \"$_netstat\" "
  _data+="}"

  # Cycles the gatherign of data.  No touchy anything below.
  if [ $_cnt -le $_droneCycles ]
  then
    _data+=","
    sleep $_droneInterval
  fi
done

_testFinish=$(date +%s)
_data+="},\"endDT\": $_testFinish }"
echo $_data > ${_logFile}

# I decided to make the file readable only to further keep it safe. Just in case there is someway to introduce 
# a test "script" that add executable data to the log file.  Might be overkill, but it was one command.
chmod 444 ${_logFile}
echo $_fileName