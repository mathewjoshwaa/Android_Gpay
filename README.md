```markdown
# Google Pay Integration

This project demonstrates the integration of Google Pay into a web application. The integration includes a simple button that allows users to make payments using Google Pay.

## Project Structure

- `index.html`: The main HTML file containing the structure of the web page.
- `style.css`: The CSS file that styles the page.
- `index.js`: The JavaScript file that handles the Google Pay integration logic.

## Features

- **Google Pay Button**: A button that triggers the Google Pay payment process.
- **Custom Transaction ID**: The code includes a custom transaction reference ID for each payment.
- **Payment Handling**: Full support for processing and handling payment responses.

## Setup

To get started with this project, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/kamesh07032005/androidgpay
   cd androidgpay
   ```

2. **Open the Project**:
   Open the `index.html` file in your preferred web browser.

3. **Run the Project**:
   Simply open `index.html` in a browser that supports the Payment Request API to see the Google Pay button in action.

## Usage

Click on the "Buy with Google Pay" button to initiate the payment process. The code checks if Google Pay is supported in the user's browser and handles the payment accordingly.

## Customization

### Changeable Fields

You can modify the following fields in the `index.js` file to customize the payment integration:

1. **Transaction Reference ID**:
   - **Location**: Line 33
   - **Field**: `tr: '1894ABCD'`
   - **Description**: A custom transaction reference ID used for each payment. Change this value to reflect your own transaction ID.

2. **Merchant Details**:
   - **Location**: Line 31
   - **Fields**: 
     - `pa: 'your merchant vpa id'`
     - `pn: 'merchant name'`
     - `mc: 'merchant id'`
   - **Description**: These fields represent the merchant's payment address, name, and category code. Update these values to your own merchant details.

3. **Order Details**:
   - **Location**: Line 45
   - **Fields**: 
     - `value: '10.01'`
   - **Description**: The total amount to be charged. Adjust this value to set the amount for your transactions.

4. **Payment Timeout**:
   - **Location**: Line 108
   - **Field**: `20 * 60 * 1000` (20 minutes)
   - **Description**: The timeout duration for the payment process. Modify this value if you need a different timeout period.

5. **Payment Request URL**:
   - **Location**: Line 102
   - **Field**: `url: 'https://google.com'`
   - **Description**: The URL associated with the payment request. Change this to the appropriate URL for your payment requests.

### Styling

- **Button Appearance**: Customize the look and feel of the Google Pay button by editing `style.css`.

## Known Issues

- **Browser Compatibility**: The Google Pay integration is dependent on the browser's support for the Payment Request API. Not all browsers may support this functionality.
- **Google Pay Errors**: There might be some issues with the bank's API or Google Pay. These issues have been raised with the Google Pay developer team and are currently being addressed.

## Contribution

Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## Links

- **Demo**: [https://gpaygoogle.netlify.app/](https://gpaygoogle.netlify.app/)
- **Google Official Documentation**: [https://developers.google.com/pay/india/api/web/googlepay-business](https://developers.google.com/pay/india/api/web/googlepay-business)

This README file now includes specific fields that can be modified to customize the integration to your needs.
```

This version now includes the demo link and the official Google documentation link for further reference.
