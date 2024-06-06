export function sortAndFilterArray2(array1: any[], array2: any[]) {
    // Create a map from array1 to get the positions
    const positionMap: Record<string, number> = {};

    array1.forEach(item => {
        positionMap[item.name] = item.position;
    });

    // Filter array2 to only include items with headers in array1
    const filteredArray2 = array2.filter(item => positionMap[item.header] !== undefined);

    // Sort filteredArray2 using the positions defined in array1
    filteredArray2.sort((a, b) => {
        // Get the position for a and b
        const posA = positionMap[a.header];
        const posB = positionMap[b.header];

        // Compare positions
        return posA - posB;
    });

    return filteredArray2;
}
