export default function parsePokemonObject(pokeObject) {
    if (!pokeObject) {
        return undefined;
    }

    const {
        name = '',
        order = undefined,
        sprites: { front_default: frontDefault },
        types = [],
    } = pokeObject;

    // Pulls the type name strings from the object
    const typeStrings = types.map((typeObj) => typeObj.type.name);

    return {
        name,
        order,
        sprite: frontDefault,
        types: typeStrings,
    };
}
