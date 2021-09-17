import merge from 'deepmerge'

export type Options = merge.Options

export default function<T>(dest: unknown, source: unknown, opts?: Options): T {
  if (source == null) return dest as T
  return merge(dest, source, opts ?? {
    arrayMerge: (_, source) => source
  }) as T
}
