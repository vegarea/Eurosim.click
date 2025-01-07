export const paymentPendingContent = `
  <h1>¡Gracias por tu pedido!</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Hemos recibido tu pedido <span class="highlight">#{numero_pedido}</span>. Para completar tu compra, por favor realiza el pago:</p>
  
  <div class="info-box">
    <h2>Detalles del pago</h2>
    <p><strong>Total a pagar:</strong> {total} {moneda}</p>
  </div>

  <a href="{url_pago}" class="button">Completar Pago</a>
  
  <p>Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.</p>
`

export const processingContent = `
  <h1>¡Pago Confirmado!</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Hemos recibido tu pago por el pedido <span class="highlight">#{numero_pedido}</span>. Estamos procesando tu pedido:</p>
  
  <div class="info-box">
    <h2>Detalles del pedido</h2>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Número de pedido:</strong> {numero_pedido}</li>
      <li><strong>Total pagado:</strong> {total} {moneda}</li>
      <li><strong>Fecha de pedido:</strong> {fecha_pedido}</li>
    </ul>
  </div>

  <p>Te mantendremos informado sobre el estado de tu pedido.</p>
`

export const shippedContent = `
  <h1>¡Tu SIM está en camino!</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>¡Buenas noticias! Tu SIM física del pedido <span class="highlight">#{numero_pedido}</span> ha sido enviada.</p>
  
  <div class="info-box">
    <h2>Información de envío</h2>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Número de seguimiento:</strong> {numero_tracking}</li>
      <li><strong>Empresa de envío:</strong> {empresa_envio}</li>
      <li><strong>Dirección de entrega:</strong> {direccion_envio}</li>
      <li><strong>Fecha estimada de entrega:</strong> {fecha_estimada}</li>
    </ul>
  </div>

  <a href="{url_tracking}" class="button">Seguir Envío</a>
`

export const esimDeliveredContent = `
  <h1>¡Tu E-SIM está lista!</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Tu E-SIM del pedido <span class="highlight">#{numero_pedido}</span> está lista para ser activada.</p>
  
  <div class="info-box">
    <h2>Información de activación</h2>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Código de activación:</strong> {codigo_activacion}</li>
      <li><strong>Fecha de activación:</strong> {fecha_activacion}</li>
    </ul>
  </div>

  <h2>Instrucciones de activación:</h2>
  <p>{instrucciones_activacion}</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <img src="{qr_code}" alt="QR Code" style="max-width: 200px; margin: 0 auto;">
  </div>
`

export const cancelledContent = `
  <h1>Pedido Cancelado</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Tu pedido <span class="highlight">#{numero_pedido}</span> ha sido cancelado.</p>
  
  <div class="info-box">
    <p>Si realizaste algún pago, el reembolso se procesará en los próximos días hábiles.</p>
  </div>

  <p>Si tienes alguna pregunta sobre la cancelación, estamos aquí para ayudarte.</p>
`

export const paymentFailedContent = `
  <h1>Problema con el Pago</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Hubo un problema al procesar el pago de tu pedido <span class="highlight">#{numero_pedido}</span>.</p>
  
  <div class="info-box">
    <p>Por favor, intenta realizar el pago nuevamente usando el botón de abajo.</p>
  </div>

  <a href="{url_pago}" class="button">Reintentar Pago</a>
  
  <p>Si continúas teniendo problemas, nuestro equipo de soporte está disponible para ayudarte.</p>
`