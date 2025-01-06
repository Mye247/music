import Page from "../../../_components/Page";
import PostDetailPage from "./_components/PostDetailPage";

interface ViewPostPageProps {
  params: Promise<{ postId: string }>;
}

async function ViewPostPage(props: ViewPostPageProps) {
  const { postId } = await props.params;

  return (
    <Page title="Post">
      {/* post 상세페이지 */}
      <PostDetailPage postId={postId} />
    </Page>
  );
}

export default ViewPostPage;
