
const allProps = [
    { id: '1', type: 'Venta', propertyType: 'Casa', district: 'Piura' },
    { id: '2', type: 'Alquiler', propertyType: 'Departamento', district: 'Castilla' },
    { id: '3', type: 'Alquiler', propertyType: 'Local Comercial', district: 'Piura' }, // Current
    { id: '4', type: 'Venta', propertyType: 'Local Industrial', district: 'San Antonio' }
];

const property = allProps[2]; // Alquiler Local Comercial en Piura

const similarProperties = allProps
    .filter(p => p.id !== property.id)
    .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        
        if (a.type === property.type) scoreA += 10;
        if (b.type === property.type) scoreB += 10;

        if (a.propertyType === property.propertyType) scoreA += 5;
        if (b.propertyType === property.propertyType) scoreB += 5;
        
        if (a.district && a.district === property.district) scoreA += 2;
        if (b.district && b.district === property.district) scoreB += 2;

        return scoreB - scoreA;
    })
    .slice(0, 2);

console.log("Current Property:", property);
console.log("Similar Properties:");
similarProperties.forEach((p, idx) => console.log(`${idx}: ${p.type} ${p.propertyType} in ${p.district}`));
