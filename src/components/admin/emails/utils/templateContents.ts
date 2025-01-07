export const paymentPendingContent = `
  <h1>¡Gracias por tu pedido!</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Hemos recibido tu pedido <span class="highlight">#{numero_pedido}</span>. Para completar tu compra, por favor realiza el pago:</p>
  
  <div class="info-box">
    <h2>Detalles del pago</h2>
    <ul class="details-list">
      <li><strong>Total a pagar:</strong> {total} {moneda}</li>
      <li><strong>Referencia:</strong> #{numero_pedido}</li>
    </ul>
  </div>

  <div style="text-align: center;">
    <a href="{url_pago}" class="button">Completar Pago</a>
  </div>
  
  <p>Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
`

export const processingContent = `
  <h1>¡Pago Confirmado!</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>¡Excelentes noticias! Hemos recibido tu pago por el pedido <span class="highlight">#{numero_pedido}</span>. Tu pedido está siendo procesado:</p>
  
  <div class="info-box">
    <h2>Detalles del pedido</h2>
    <ul class="details-list">
      <li><strong>Número de pedido:</strong> #{numero_pedido}</li>
      <li><strong>Total pagado:</strong> {total} {moneda}</li>
      <li><strong>Fecha de pedido:</strong> {fecha_pedido}</li>
    </ul>
  </div>

  <p>Te mantendremos informado sobre el estado de tu pedido. Pronto recibirás más información sobre el envío.</p>
`

export const shippedContent = `
  <h1>¡Tu SIM está en camino!</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>¡Buenas noticias! Tu SIM física del pedido <span class="highlight">#{numero_pedido}</span> ha sido enviada y está en camino.</p>
  
  <div class="info-box">
    <h2>Información de envío</h2>
    <ul class="details-list">
      <li><strong>Número de seguimiento:</strong> {numero_tracking}</li>
      <li><strong>Empresa de envío:</strong> {empresa_envio}</li>
      <li><strong>Dirección de entrega:</strong> {direccion_envio}</li>
      <li><strong>Fecha estimada:</strong> {fecha_estimada}</li>
    </ul>
  </div>

  <div style="text-align: center;">
    <a href="{url_tracking}" class="button">Seguir mi Envío</a>
  </div>

  <p>Podrás realizar el seguimiento de tu envío en tiempo real utilizando el botón de arriba.</p>
`

export const esimDeliveredContent = `
  <h1>¡Tu E-SIM está lista!</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Tu E-SIM del pedido <span class="highlight">#{numero_pedido}</span> está lista para ser activada.</p>
  
  <div class="info-box">
    <h2>Información de activación</h2>
    <ul class="details-list">
      <li><strong>Código de activación:</strong> {codigo_activacion}</li>
      <li><strong>Fecha de activación:</strong> {fecha_activacion}</li>
    </ul>
  </div>

  <h2>Instrucciones de activación:</h2>
  <p>{instrucciones_activacion}</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <img src="{qr_code}" alt="QR Code" style="max-width: 200px; margin: 0 auto;">
  </div>

  <div class="info-box">
    <p style="margin: 0;">
      <strong>Importante:</strong> Guarda este correo electrónico, ya que contiene información importante para la activación de tu E-SIM.
    </p>
  </div>
`

export const cancelledContent = `
  <h1>Pedido Cancelado</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Tu pedido <span class="highlight">#{numero_pedido}</span> ha sido cancelado.</p>
  
  <div class="info-box">
    <h2>Información importante</h2>
    <p>Si realizaste algún pago, el reembolso se procesará en los próximos días hábiles. El tiempo de acreditación dependerá de tu banco o método de pago utilizado.</p>
  </div>

  <p>Si tienes alguna pregunta sobre la cancelación o necesitas asistencia adicional, nuestro equipo de soporte está disponible para ayudarte.</p>
`

export const paymentFailedContent = `
  <h1>Problema con el Pago</h1>
  <p>Hola <span class="highlight">{nombre_cliente}</span>,</p>
  <p>Hubo un problema al procesar el pago de tu pedido <span class="highlight">#{numero_pedido}</span>.</p>
  
  <div class="info-box">
    <h2>¿Qué sucedió?</h2>
    <p>Tu pago no pudo ser procesado. Esto puede deberse a:</p>
    <ul style="margin: 10px 0; padding-left: 20px;">
      <li>Fondos insuficientes</li>
      <li>Datos de la tarjeta incorrectos</li>
      <li>Problema temporal con el procesador de pagos</li>
    </ul>
  </div>

  <div style="text-align: center;">
    <a href="{url_pago}" class="button">Reintentar Pago</a>
  </div>
  
  <p>Si continúas teniendo problemas, nuestro equipo de soporte está disponible para ayudarte a completar tu compra.</p>
`