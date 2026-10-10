// support tim kiem, sap xep, phan trang

const escapeLike = (s) => {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// qb la query builder, nay chi sua lai query builder neu co query tu url, chu chua chay query builder nha ae
export const whereSearch = (qb, q, expr = "code || ' ' || name") =>
  q
    ? qb.whereRaw(`lower(f_unaccent(${expr})) like lower(f_unaccent(?))`, [
        `%${escapeLike(q)}%`,
        expr,
      ])
    : qb;

// neu query sort co dau - thi se sap xep giam dan
// allowed la cac field co the sap xep, can han che field nay de chan client xay ra bug
export const applySort = (qb, sort, allowed, fallback = "code") => {
  const desc = sort?.startsWith("-");
  const column = desc ? sort.slice(1) : sort;
  return allowed.includes(column)
    ? qb.orderBy(column, desc ? "desc" : "asc")
    : qb.orderBy(fallback, "asc");
};

//return items, total,page,pageSize
// nen gioi han pageSize de chan cac request neu client gui len so qua lon, cac ban co the chan trong dto, minh dinh lam nhung ma luoi` :v
export const paginate = async (qb, { page = 1, pageSize = 20 } = {}) => {
  const [{ total }] = await qb
    .clone()
    .clearSelect()
    .clearOrder()
    .count({ total: "*" });

  const items = await qb.limit(pageSize).offset((page - 1) * pageSize);
  return { items, total: Number(total), page, pageSize };
};
