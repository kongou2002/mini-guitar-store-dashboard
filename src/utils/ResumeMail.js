export const ApprovedResume = ({ firstName }) => ({
  subject: `👋 ${firstName}`,
  body: (
    <div>
      <p>Hello {firstName}!</p>
      <p>Hope you'll enjoy the package!</p>
    </div>
  ),
});

export const RejecteddResume = ({ firstName }) => ({
  subject: `👋 ${firstName}`,
  body: (
    <div>
      <p>Hello {firstName}!</p>
      <p>Hope you'll enjoy the package!</p>
      <p></p>
    </div>
  ),
});
