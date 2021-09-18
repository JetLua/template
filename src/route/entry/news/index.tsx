import style from './style.less'

export default React.memo(function(props: Props) {
  return <section className={[style.root, props.className].join(' ')}
    style={{...props.style}}
  >
    news
  </section>
})

interface Props {
  className?: string
  style?: React.CSSProperties
}
