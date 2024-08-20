import Error from 'next/error'

function CustomError({ statusCode }: { statusCode: any }) {
  return <Error statusCode={statusCode} />
}

CustomError.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default CustomError
