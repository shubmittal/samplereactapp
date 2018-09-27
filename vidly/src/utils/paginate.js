
export function paginate (items, pageNumber, pageSize)
{
    if (!Array.isArray(items))
    {
        console.log("Sorry only arrays can be paginated")
        return null;
    }
    const startIndex = (pageNumber-1)*pageSize;
    return items.slice(startIndex, startIndex+pageSize)
    
}