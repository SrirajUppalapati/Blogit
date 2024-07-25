/* eslint-disable react/no-danger-with-children */
function Content({ block }) {
  const { data, type } = block;
  if (type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>;
  }
  if (type === "header") {
    if (data.level === 1) {
      return (
        <h1
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="capitalize"
        ></h1>
      );
    } else if (data.level === 2) {
      return (
        <h2
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="capitalize"
        ></h2>
      );
    } else if (data.level === 3) {
      return (
        <h3
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="capitalize"
        ></h3>
      );
    } else {
      return (
        <h4
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="capitalize"
        ></h4>
      );
    }
  }
  if (type === "image") {
    return (
      <div className="flex items-center justify-center flex-col">
        <img
          src={data.url}
          alt="dataimage"
          className="max-w-[640px] max-h-[640px] aspect-square"
        />
        {data.caption && (
          <span className="italic text-slate-600 dark:text-slate-300">
            {data?.caption}
          </span>
        )}
      </div>
    );
  }

  if (type === "list") {
    return (
      <ul className="list-disc">
        {data.items?.map((curr, index) => (
          <li key={index} className="mb-1">
            {curr}
          </li>
        ))}
      </ul>
    );
  }
}

export default Content;
