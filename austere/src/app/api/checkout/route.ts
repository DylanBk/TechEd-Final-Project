import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(request: Request) {
  try {
    const { items } = await request.json();

    // Create line items for Stripe
    const lineItems = items.map((item: any) => {
      // Create a description of customizations
      const customizationDetails = [
        `Size: ${item.customization.selectedSize}`,
        `Color: ${item.customization.selectedColor}`,
        `Material: ${item.customization.selectedMaterial}`
      ];

      if (item.customization.selectedEmbellishments.length > 0) {
        customizationDetails.push(`Embellishments: ${item.customization.selectedEmbellishments.join(', ')}`);
      }

      if (item.customization.selectedHardware.length > 0) {
        customizationDetails.push(`Hardware: ${item.customization.selectedHardware.join(', ')}`);
      }

      return {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: item.name,
            description: customizationDetails.join('\n'),
            images: [process.env.NEXT_PUBLIC_BASE_URL + item.image.src]
          },
          unit_amount: item.customization.totalPrice * 100 // Convert to cents
        },
        quantity: 1
      };
    });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
      shipping_address_collection: {
        allowed_countries: ['GB', 'US', 'CA', 'FR', 'DE', 'IT', 'ES', 'JP']
      },
      custom_text: {
        shipping_address: {
          message: 'Please provide the address where you would like your bespoke item delivered.'
        },
        submit: {
          message: 'We will process your order and contact you for final measurements and details.'
        }
      }
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
} 