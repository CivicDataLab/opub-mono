import { Page } from './page-layout';

// const allDatasetsQueryDoc = graphql(`
//   query allDatasetsQuery {
//     all_datasets {
//       id
//       title
//       description
//     }
//   }
// `);

export default async function DatasetPage() {
  // const queryClient = getQueryClient();
  // await queryClient.prefetchQuery(['all_datasets'], () =>
  //   GraphQL(allDatasetsQueryDoc)
  // );
  // const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <div className="flex h-full flex-col">
        <Page />
      </div>
    </>
  );
}
