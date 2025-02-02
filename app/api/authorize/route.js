export async function POST(req) {
    const auth = await req.json();
    console.log('Username:', auth.user);
    console.log('Password:', auth.password);
    return Response.json(
        { user: auth.user, password: auth.password }, {status: 200}
    )
}