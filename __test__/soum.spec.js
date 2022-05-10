test('testing home page', () => {
    const req = {},
        res = { render: jest.fn() }
    const home = ( req, res ) => res.render( '/' )
    expect(res.render.mock.calls[0][0]).toBe('Soum')
})