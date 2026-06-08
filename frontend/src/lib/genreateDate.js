export const Dategenreate=(data)=>{
    return new Date(data).toLocaleDateString("en-US",{
        hour:"2-digit",
        minute:"2-digit",
        second:"2-digit",
        hour12:true
    
    })
}