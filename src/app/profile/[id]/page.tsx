export default async function UserProfile({ params }: any) {
  const { id } = await params;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <p className="text-4xl">Welcome to your profile!</p>
      <p className="text-2xl mt-4">
        User ID:
        <span className="font-bold ml-2">{id}</span>
      </p>
    </div>
  );
}
