const Query = {
  User: (_, data) => {
    return {id: "foo"}
  },
};

const resolvers = { Query };

export { resolvers };