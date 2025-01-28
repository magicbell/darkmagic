import { arrayElement, uuidv4 } from './utils.js';

export const names = ['Jane Doe', 'John Johnson', 'Jack Robinson'];
export const sources = ['Sales Contract', 'GitHub Issue', 'Twitter'];
export const selection = ['Subscribed', 'Matched', 'Direct'];
export const status = ['seen', 'read'];

export const listData = Array.from({ length: 6 }).map((_, i) => {
  const author = arrayElement(names, i);
  return {
    id: uuidv4(),
    date: new Date(Date.now() - i * 1000 * 60 * 60 * 24),
    author,
    event: `${author} commented on ${arrayElement(sources, i)}`,
    selection: arrayElement(selection, i),
    status: arrayElement(status, i),
  };
});

export const notification = {
  notification: {
    title: "We're processing your order",
    content: "Thank you for your order. We'll notify you when these items are ready.",
    category: 'order_created',
    topic: 'order:33098',
    recipients: [
      {
        email: 'dan@example.com',
      },
    ],
    overrides: {
      email: {
        title: "[MagicBell] We're processing your order",
        content:
          "Thank you for your order. If you need help, or have any questions please don't hesitate to reach out to us directly at hello@magicbell.com",
      },
    },
  },
};

const paragraphs = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis justo nulla, vestibulum vel finibus ac, egestas in neque. Etiam feugiat quam id ipsum accumsan gravida. Aenean consectetur tellus dapibus ipsum rhoncus, eget scelerisque augue fringilla. Nam et dictum magna, et aliquet elit. Nullam eu semper enim, eu vulputate erat. Vivamus facilisis vel urna id pellentesque. Curabitur eget ligula eleifend ex pretium scelerisque.`,
  `Nunc finibus venenatis nunc, vitae blandit quam malesuada nec. Integer fermentum non tortor non sodales. Sed sed arcu eu sem ornare interdum at in dui. Sed finibus mi at nunc rhoncus, et feugiat nunc interdum. Curabitur auctor diam eget dui ullamcorper, nec porta nibh maximus. Mauris non mauris eget elit rutrum vulputate. Quisque eu nibh ac mauris lobortis ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut at diam lobortis, mattis diam ut, pellentesque velit. Mauris at turpis placerat, vehicula nulla sit amet, sollicitudin justo.`,
  `Phasellus vehicula sit amet elit eget varius. Etiam dapibus metus ante, vel tristique sem molestie et. In hendrerit leo congue ex tincidunt, quis placerat ipsum gravida. Proin ac metus rhoncus, placerat neque eget, laoreet leo. Pellentesque diam mauris, blandit quis augue a, pellentesque cursus augue. Morbi rhoncus bibendum auctor. Nulla pellentesque nibh quis est semper, id mattis dui condimentum. Donec hendrerit cursus eros at lobortis. Nam pulvinar cursus dolor nec imperdiet. Etiam feugiat ultrices eleifend. Praesent nec lorem ut nisi vehicula iaculis a quis magna. Etiam rhoncus ipsum pretium vestibulum aliquet. Pellentesque vel urna quis nulla viverra faucibus sit amet sit amet augue.`,
  `Suspendisse mattis est id risus finibus commodo. Sed turpis erat, feugiat sit amet accumsan ac, convallis accumsan lorem. Sed rutrum cursus metus, non interdum nisi. Praesent tempus libero justo, sit amet accumsan urna lobortis id. Donec laoreet id elit sit amet sagittis. Proin consequat, risus sagittis tristique fermentum, lorem ex pretium magna, at pretium justo lacus non massa. Fusce vulputate tempor purus, at efficitur nulla sagittis in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque a elementum quam, nec elementum sapien. Vestibulum faucibus consequat lorem in semper.`,
  `Aenean vitae faucibus massa. Pellentesque vel massa ac erat venenatis feugiat. Duis lobortis leo ut metus tempus, ut pretium nibh dignissim. Aliquam et mattis justo, eu iaculis orci. Proin consectetur dolor eros, id lobortis nibh placerat id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse ornare, arcu sit amet iaculis vehicula, augue nulla elementum velit, ac pretium ipsum massa et risus. Nullam fermentum iaculis turpis, sit amet tincidunt odio. Morbi non arcu cursus, interdum tortor non, fringilla arcu. Donec id ultricies nisl. Donec volutpat quam sed malesuada molestie. Aenean at odio at dolor vulputate mattis. Integer pellentesque posuere mauris, eget sollicitudin orci feugiat in.`,
  `Nulla eu fringilla enim. Maecenas aliquam nulla id vulputate sodales. Duis iaculis ligula erat, at bibendum orci hendrerit ut. Mauris vel suscipit nunc. Etiam vel nisl eget nibh fermentum commodo et et risus. Cras elit ex, lobortis non tortor a, ultrices commodo ex. Vestibulum sagittis felis massa, et elementum lacus accumsan vitae. Nullam iaculis elementum nisi et suscipit.`,
  `Donec tincidunt, purus ut ornare porttitor, velit eros ultrices velit, ac finibus lorem lacus non nisl. Cras vulputate congue leo, non condimentum urna. Donec eu finibus sapien. Integer eu hendrerit tortor. Aenean lorem nisl, cursus ac commodo maximus, gravida eget dolor. Sed eu maximus elit. Suspendisse sit amet lacus ut arcu pharetra maximus quis quis nisi. Aenean tempor venenatis porttitor. Nullam posuere nulla id finibus ornare. Praesent finibus orci eget ligula eleifend aliquet. Fusce eu justo a magna pharetra dictum. Maecenas quam urna, auctor ac sem at, sagittis mattis metus. In efficitur, quam nec semper ullamcorper, purus odio pellentesque orci, eu cursus lacus ipsum quis metus. Nunc euismod, diam at efficitur tincidunt, ex mi ullamcorper felis, id tristique diam risus vel est. Ut in justo a eros mattis vulputate in a mauris. Quisque nec massa tincidunt, eleifend leo sagittis, mattis ex.`,
  `Vivamus libero est, vestibulum non accumsan sit amet, porttitor hendrerit purus. Fusce nec mattis magna. Praesent pharetra et purus ut pretium. Duis laoreet mollis mi nec cursus. Morbi pretium lorem quis tortor consequat, pretium dignissim sem aliquet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla rhoncus pharetra consequat. Nunc sed nisi a purus accumsan ultricies. Sed suscipit elit at massa tempor, in elementum tortor dapibus. In a magna mauris. Ut eu nibh risus. Curabitur finibus lacus quis est consequat auctor. Nam ullamcorper lacus in laoreet euismod. Nullam odio leo, gravida eu elementum sit amet, eleifend a diam.`,
  `Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus quis dapibus risus, et suscipit ex. Aliquam erat volutpat. Pellentesque id efficitur tellus, eu venenatis dui. Nunc sed tellus viverra, lacinia sem sed, gravida lorem. Nullam ultricies imperdiet ornare. Maecenas feugiat massa sed nunc auctor luctus. Sed vehicula nibh viverra lectus vestibulum placerat. Vestibulum vitae nibh nec lorem tempus hendrerit id vel erat. Donec auctor neque vitae lectus facilisis, ut varius orci volutpat. Proin sit amet interdum lacus. Morbi at arcu nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut at turpis ultricies est aliquet sagittis. Praesent quis mi enim. Curabitur aliquet lorem elit, egestas congue dolor fringilla at.`,
  `Mauris egestas, diam vel euismod pretium, neque elit fermentum nisi, at mattis felis orci suscipit dui. Aenean finibus consectetur ultrices. Nunc nec consectetur ex. Cras et ornare tellus. In hac habitasse platea dictumst. Suspendisse a sem quis nibh feugiat maximus. Fusce et viverra odio. Vivamus rutrum eros sed ligula faucibus malesuada. Phasellus quis tincidunt dui.`,
];

export function lorem(paragraphCount: number, sentencesPerParagraph?: number) {
  return paragraphs
    .slice(0, paragraphCount)
    .map((paragraph) =>
      sentencesPerParagraph ? paragraph.split('.').slice(0, sentencesPerParagraph).join('.') : paragraph,
    )
    .join('\n');
}
