import Page from "@/app/(providers)/(root)/_components/Page";
import EditPostDetailPage from "./_components/EditPostDetailPage";

interface EditPostPage {
  params: Promise<{ postId: string }>;
}

async function EditPostPage(props: EditPostPage) {
  const { postId } = await props.params;
  console.log(postId);
  return (
    <Page title="edit post">
      {/* post 수정페이지 */}
      <EditPostDetailPage postId={postId} />
    </Page>
  );
}

export default EditPostPage;
