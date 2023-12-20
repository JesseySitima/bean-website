<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Get the form fields and sanitize them
  $name = strip_tags(trim($_POST["name"]));
  $name = str_replace(array("\r","\n"),array(" "," "),$name);
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $phone = trim($_POST["phone"]);
  $date = trim($_POST["date"]);
  $department = trim($_POST["department"]);
  $message = trim($_POST["message"]);

  // Set your email address where you want to receive emails
  $recipient = "jaysitima@gmail.com";

  // Set the email subject
  $subject = "New Appointment Request from $name";

  // Build the email content
  $email_content = "Name: $name\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Phone: $phone\n";
  $email_content .= "Appointment Date: $date\n";
  $email_content .= "Department: $department\n";
  $email_content .= "Message: $message\n";

  // Email headers
  $email_headers = "From: $name <$email>";

  // Send the email
  if (mail($recipient, $subject, $email_content, $email_headers)) {
    // If the email is sent successfully, redirect to a thank-you page
    header("Location: thank-you.html");
    exit;
  } else {
    // If there was an error sending the email, display an error message
    echo "Oops! Something went wrong and we couldn't send your message.";
  }
} else {
  // If it's not a POST request, display an error message
  echo "There was a problem with your submission. Please try again.";
}
?>
