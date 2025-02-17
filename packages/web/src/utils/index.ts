export function areObjectsEqual<T, K>(obj1: any, obj2: any) {
  if (obj1 === obj2) return true // 检查引用是否相同

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  // 如果属性数量不同，直接返回false
  if (keys1.length !== keys2.length) return false

  // 综合检查每个属性和子属性的值
  for (const key of keys1) {
    const val1 = obj1[key]
    const val2 = obj2[key]

    if (
      val1 === val2 ||
      (typeof val1 === 'object' && typeof val2 === 'object' && areObjectsEqual(val1, val2))
    ) {
      continue
    }

    return false
  }

  // 处理循环引用情况
  const seen = new Set()
  function isCircular(obj: any) {
    if (seen.has(obj)) return true
    seen.add(obj)
    for (const key of Object.keys(obj)) {
      if (isCircular(obj[key])) return true
    }
    seen.delete(obj)
    return false
  }

  // 如果是循环引用，返回false（视为不同对象）
  if (isCircular(obj1) || isCircular(obj2)) return false

  return true
}
