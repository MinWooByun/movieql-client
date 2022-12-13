import { ApolloClient, InMemoryCache } from "@apollo/client";

// cache를 InMemoryCache로 설정하면 쿼리 결과가 브라우저의 메모리에 있는 cache에 저장된다.
// 그러기 때문에 다른 화면으로 이동했다가 다시 돌아왔을 때 데이터를 다시 가져오지 않아도 된다.
export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

export default client;
