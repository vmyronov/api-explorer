import Posts from '../Pokemon'

let path

describe('GET /pokemon', () => {
  beforeEach(async () => {
    path = 'pokemon'
  })
  afterEach(async () => {
    //cleanup
  })
  it('should succeed+', async () => {
    const pokemon = await Posts.getPokemans(path)
    expect(pokemon.statusCode).toBe(200)
    expect(typeof pokemon.body).toBe('object')
  })
  it('should limit unspecified requests to 20', async () => {
    const pokemon = await Posts.getPokemans(path)
    expect(pokemon.body.results.length).toBe(20)
  })
  it('should allow requests to be > 20', async () => {
    path = `pokemon?offset=20&limit=80`
    const pokemon = await Posts.getPokemans(path)
    expect(pokemon.body.results.length).toBe(80)
  })
  it('should use the offset to remove the first x number of results', async () => {
    path = `pokemon?offset=40&limit=80`
    const pokemon = await Posts.getPokemans(path)
    expect(pokemon.body.results.length).toBe(80)
  })
  it('should use the offset to remove the first x number of results', async () => {
    path = `pokemon?offset=40&limit=10`
    const pokemon = await Posts.getPokemans(path)
    const pokemonIDs = pokemon.body.results.map(function(pokemon){
      return pokemon.url.slice(-3).slice(0, -1)
    })
    const control = [
      '41', '42', '43',
      '44', '45', '46',
      '47', '48', '49',
      '50'
    ]
    expect(pokemon.body.results.length).toBe(10)
    expect(pokemonIDs).toEqual(control)
  })
  it('should accept a limit as an integer', async () => {
    const pokemon = await Posts.getPokemans(path, '40')
    expect(pokemon.body.results.length).toBe(40)
  }) 
  it('should have a total pokemon count of 1154', async () => {
    const pokemon = await Posts.getPokemans(path)
    expect(pokemon.body.count).toEqual(1154)
  })
  it('should have the first pokemon name "bulbasaur"', async () => {
    const pokemon = await Posts.getPokemans(path)
    expect(pokemon.body.results[0].name).toEqual("bulbasaur")
  })
})
