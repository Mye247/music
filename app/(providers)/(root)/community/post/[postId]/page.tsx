import ViewPostDetailPage from "./_components/ViewPostDetailPage";

interface ViewPostPageProps {
  params: Promise<{ postId: string }>;
}

async function ViewPostPage(props: ViewPostPageProps) {
  const { postId } = await props.params;

  return (
    <>
      {/* post 상세페이지 */}
      <ViewPostDetailPage postId={postId} />
    </>
  );
}

export default ViewPostPage;
