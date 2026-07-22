import post from './schemas/post';
import author from './schemas/author';
import htmlEmbed from './schemas/htmlEmbed';
import developmentService from './schemas/developmentService';
import aiTool from './schemas/aiTool';
import toolCategory from './schemas/toolCategory';
import blogCategory from './schemas/blogCategory';

export const schema = {
  types: [
    post,
    author,
    htmlEmbed,
    developmentService,
    aiTool,
    toolCategory,
    blogCategory,
  ],
};
