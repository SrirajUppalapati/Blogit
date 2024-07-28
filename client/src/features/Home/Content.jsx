/* eslint-disable react/no-danger-with-children */
function Content({ block }) {
  const { data, type } = block;
  if (type === "paragraph") {
    return (
      <p
        dangerouslySetInnerHTML={{ __html: data.text }}
        className="leading-tight tracking-tight"
      ></p>
    );
  }
  if (type === "header") {
    if (data.level === 1) {
      return (
        <h1
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="capitalize leading-tight tracking-tight"
        ></h1>
      );
    } else if (data.level === 2) {
      return (
        <h2
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="capitalize leading-tight tracking-tight"
        ></h2>
      );
    } else if (data.level === 3) {
      return (
        <h3
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="capitalize leading-tight tracking-tight"
        ></h3>
      );
    } else {
      return (
        <h4
          dangerouslySetInnerHTML={{ __html: data.text }}
          className="capitalize leading-tight tracking-tight"
        ></h4>
      );
    }
  }
  if (type === "image") {
    return (
      <div className="flex items-center justify-center flex-col py-10">
        <img
          src={data.url}
          alt="dataimage"
          className="md:max-w-[640px] md:max-h-[640px] aspect-square max-w-[200px] max-h-[200px]"
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
          <li key={index} className="mb-2 leading-tight">
            {curr}
          </li>
        ))}
      </ul>
    );
  }
}

export default Content;
