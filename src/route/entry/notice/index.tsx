import style from './style.less'

export default React.memo(function(props: Props) {
  return <section className={style.root} style={{...props.style}}>
    notice
  </section>
})

interface Props {
  style?: React.CSSProperties
}
