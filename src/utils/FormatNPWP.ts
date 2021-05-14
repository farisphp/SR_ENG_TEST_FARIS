export const formatNPWP = (npwp: string) => {
    const npwpNumber = npwp.split(/[\.-]/).join("");
    console.log("npwp number only: ", npwpNumber);
    let formattedNPWP = npwpNumber.substring(0,2);
    if (npwpNumber.length > 2)
        formattedNPWP += "." + npwpNumber.substring(2, 5);

    if (npwpNumber.length > 5){
        formattedNPWP += "." + npwpNumber.substring(5, 8);
    }

    if (npwpNumber.length > 8)
        formattedNPWP += "." + npwpNumber.substring(8, 9);
    
    if (npwpNumber.length > 9)
        formattedNPWP += "-" + npwpNumber.substring(9, 12);

    if (npwpNumber.length > 12)
        formattedNPWP += "." + npwpNumber.substring(12, 15);

    return formattedNPWP;
}