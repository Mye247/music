import Page from "../../../_components/Page";
import ViewPostDetailPage from "./_components/ViewPostDetailPage";

interface ViewPostPageProps {
  params: Promise<{ postId: string }>;
}

async function ViewPostPage(props: ViewPostPageProps) {
  const { postId } = await props.params;

  return (
    <Page title="Post">
      {/* post 상세페이지 */}
      <ViewPostDetailPage postId={postId} />
    </Page>
  );
}

export default ViewPostPage;
