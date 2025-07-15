# Email Setup Guide

## Current Implementation

The contact form is currently implemented with a fallback to `mailto:` links, which opens the user's email client. This works but isn't ideal for user experience.

## Setting up EmailJS for Proper Email Functionality

### Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service

1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the authentication steps
5. Note down your **Service ID**

### Step 3: Create Email Template

1. Go to "Email Templates"
2. Click "Create New Template"
3. Design your template with these variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Email message
4. Save the template and note down your **Template ID**

### Step 4: Get Your Public Key

1. Go to "Account" → "API Keys"
2. Copy your **Public Key**

### Step 5: Set Up Environment Variables

Create a `.env` file in your project root with your EmailJS credentials:

```bash
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual EmailJS credentials from your dashboard.

### Step 6: Code is Already Updated

The code has been updated to use environment variables and EmailJS is already enabled. The contact form should now work with proper email delivery!

## Alternative Email Services

If you prefer other services:

### Formspree

- Go to [Formspree.io](https://formspree.io/)
- Create a form endpoint
- Use fetch API to submit form data

### Netlify Forms

- Add `netlify` attribute to your form
- Deploy to Netlify
- Forms are automatically handled

### Supabase Edge Functions

- Create an edge function in your Supabase project
- Use a service like SendGrid or Resend
- More control but requires more setup

## Security Considerations

1. **Rate Limiting**: Consider implementing rate limiting to prevent spam
2. **Validation**: Always validate form data on both client and server
3. **CORS**: Ensure your email service allows requests from your domain
4. **Environment Variables**: Store sensitive keys in environment variables

## Testing

After setup:

1. Fill out the contact form
2. Submit the form
3. Check your email inbox
4. Verify the email was received with correct formatting

## Troubleshooting

- **Email not received**: Check spam folder, verify service configuration
- **Form not submitting**: Check browser console for errors
- **Template variables not working**: Ensure variable names match exactly
