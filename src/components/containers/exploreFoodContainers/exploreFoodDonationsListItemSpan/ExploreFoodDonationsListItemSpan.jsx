const ExploreFoodDonationsListItemSpan = ({ donationsData }) => {
  // Format allergens array
  const allergens = Array.isArray(donationsData.allergens)
    ? donationsData.allergens.join(', ')
    : donationsData.allergens

  // Format dates
  const postDate = donationsData.postDate
    ? new Date(donationsData.postDate).toLocaleDateString()
    : ''

  const useBy = donationsData.useBy
    ? new Date(donationsData.useBy).toLocaleDateString()
    : ''
  return (
    <>
      <span className="posted__donation-spam">{allergens}</span>
      <span className="posted__donation-spam">{postDate}</span>
      <span className="posted__donation-spam">{donationsData.servings}</span>
      <span className="posted__donation-spam">{useBy}</span>
      <span className="posted__donation-spam">{donationsData.mealName}</span>
    </>
  )
}
export default ExploreFoodDonationsListItemSpan
