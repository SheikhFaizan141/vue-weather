/**
*@param temp Numer | String
*@param unit String 
*/
export function formatUnit(temp, scale) {
    // console.log(typeof temp);
    const value = scale === 'c' ? temp - 273.15 : (1.8 * (temp - 273.15) + 32);
    return Math.round(value);
}