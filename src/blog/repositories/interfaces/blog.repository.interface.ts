export interface IBlogRepository {
  createBlog(
    data: {
      title: string;
      content: string;
      userId: string;
    },
    session?: any,
  ): Promise<any>;
  findPostById(id: string): Promise<any>;
  getBlogs(): Promise<any>;
}
