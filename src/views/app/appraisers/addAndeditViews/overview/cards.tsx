
import EditIcon from '@mui/icons-material/Edit';
import { Card, CardContent, Divider, IconButton, Typography } from '@mui/material';

const contactDetails = [
  { label: 'Name', value: 'Rosa Garcia (SplitAlberto Aylormade)', icon: 'ri-account-circle-line' },
  { label: 'Phone', value: '(817) 944-5887 : home', icon: 'ri-phone-line' },
  { label: 'Email', value: 'rosa120606@gmail.com', icon: 'ri-mail-line', isEmail: true },
  { label: 'Mailing', value: 'Same as Location', icon: 'ri-user-location-line' },
  { label: 'Billing', value: 'Same as Location', icon: 'ri-bill-line' },
  { label: 'Cross Reference', value: '', icon: null }
];

const ContactCard = () => {
  return (
    <Card className="max-w-md mx-auto shadow-lg ">
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Typography variant="h6" component="div">
              Primary Contact
            </Typography>
          </div>
          <IconButton size="small" className="ml-2">
            <EditIcon fontSize="small" />
          </IconButton>
        </div>
        <Divider className="my-4" />
        <div className="space-y-3">
          {contactDetails.map((detail, index) => (
            <div key={index} className="flex items-center">
              <i className={`${detail.icon} mr-2 w-4 h-4`}></i>
              <Typography variant="body1">
                <strong>{detail.label}:</strong>{' '}
                {detail.isEmail ? (
                  <a href={`mailto:${detail.value}`} className="text-blue-500">
                    {detail.value}
                  </a>
                ) : (
                  detail.value
                )}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
