import ProfileDetail from "./_components/ProfileDetail";

interface UserProfilePageProps {
  params: Promise<{ userId: string }>;
}

async function UserProfilePage({ params }: UserProfilePageProps) {
  const { userId } = await params;
  return (
    <>
      {/* 프로필 상세 페이지 */}
      <ProfileDetail userId={userId} />
    </>
  );
}

export default UserProfilePage;
