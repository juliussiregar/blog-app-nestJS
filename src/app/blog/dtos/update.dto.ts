export interface UpdateBlogDto {
  _id: string;

  clientProps: {
    title?: string;

    content?: string;
  };
}
