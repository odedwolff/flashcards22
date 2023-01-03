const levenshteinDistance = (str1 = '', str2 = '') => {
    const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
       track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
       track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
       for (let i = 1; i <= str1.length; i += 1) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          track[j][i] = Math.min(
             track[j][i - 1] + 1, // deletion
             track[j - 1][i] + 1, // insertion
             track[j - 1][i - 1] + indicator, // substitution
          );
       }
    }
    return track[str2.length][str1.length];
 };

 function minDistance(strings, string){
   var minDistance = 999, distance; 
   for(var i = 0 ; i < strings.length ; i++){
       distance = levenshteinDistance(string, strings[i].trim());
       if(distance < minDistance){
           minDistance = distance;
       }
   }
   return minDistance;
 }

 //the code is supposed to run on the client, this is just for testing 
 if(typeof module != 'undefined' ){
   module.exports.minDistance = minDistance;
 }
