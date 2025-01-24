'use client'
interface Props {
  params: {
    fleetId: string
  }
}
const UpdateTripPage = ({ params }: Props) => {
  console.log(params.fleetId)

  return <div>fleet details goes here</div>
}

export default UpdateTripPage
