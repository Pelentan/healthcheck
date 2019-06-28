/**
 * This gadget parses the results of the linux "free" command into it's data.
 */

 const parseLinuxFree = (strIn) =>{
   const returnData = {};
   strIn = strIn.replace(" total used free shared buff/cache available ", "");
   let x = strIn.indexOf("Swap:");
   returnData.mem = strIn.slice(0,x).split(":")[1].trim().split(" ");
   returnData.swap = strIn.slice(x).split(":")[1].trim().split(" ");   
   //console.log(returnData);
   return returnData;
 }


module.exports = parseLinuxFree;