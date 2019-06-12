{"host": "1dd9271c2389", "startDT": 1560311762,
"cycleCount": 1, "cycleInterval": 5, "cycles": {
"1": {"cycleCount": 1, "cycleTime": 1560311762,
"uptime": " 03:56:02 up 18 days, 14:55,  0 users,  load average: 0.00, 0.00, 0.00", 
"free": "              total        used        free      shared  buff/cache   available
Mem:       16133048      744412    10362844        1576     5025792    14992904
Swap:       2097148           0     2097148",
"df": "Filesystem     1K-blocks     Used Available Use% Mounted on
overlay         61255652 23311428  34802892  41% /
tmpfs              65536        0     65536   0% /dev
tmpfs            8066524        0   8066524   0% /sys/fs/cgroup
/dev/sda1       61255652 23311428  34802892  41% /data/db
shm                65536        0     65536   0% /dev/shm
tmpfs            8066524        0   8066524   0% /proc/acpi
tmpfs            8066524        0   8066524   0% /sys/firmware", 
"vmstat": "procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 0  0      0 10362800 417404 4608388    0    0     0     2    4    2  0  0 100  0  0", 
"iostat": "", 
"ps": "UID        PID  PPID  C STIME TTY          TIME CMD
mongodb      1     0  0 Jun06 ?        00:27:23 mongod --auth --bind_ip_all
root      1874     0  0 Jun09 ?        00:00:00 /usr/sbin/sshd
root      6316  1874  0 03:56 ?        00:00:00 sshd: hcdronedock [priv]
hcdrone+  6325  6316  0 03:56 ?        00:00:00 sshd: hcdronedock@notty
hcdrone+  6326  6325  0 03:56 ?        00:00:00 bash scripts/hc_server_checks.hc 1 5 hc-server-report.hc
hcdrone+  6335  6326  0 03:56 ?        00:00:00 ps -ef", 
"netstat": "", 
}, 
}
